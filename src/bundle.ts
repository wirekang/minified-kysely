import { rollup } from "rollup";
import path from "node:path/posix";
import terser from "@rollup/plugin-terser";
import { dts } from "rollup-plugin-dts";

export async function bundle(rootDir: string, outDir: string, exports: Record<string, string>) {
  const input: any = {};
  Object.entries(exports).forEach(([exportPath, exportEntrypoint]) => {
    const ep = exportPath === "." ? "index" : exportPath.replace("./", "");
    input[ep] = path.join(rootDir, exportEntrypoint);
  });
  const jsBundle = await rollup({
    input,
    logLevel: "silent",
    plugins: [
      terser({
        keep_classnames: true,
        keep_fnames: true,
      }),
    ],
  });
  await jsBundle.write({ dir: outDir });
  await jsBundle.close();

  const dtsInput: any = {};
  Object.entries(input).forEach(([k, v]) => {
    dtsInput[k] = (v as string).replace(".js", ".d.ts");
  });
  const dtsBundle = await rollup({
    input: dtsInput,
    plugins: [dts()],
  });

  await dtsBundle.write({ dir: outDir });
  await dtsBundle.close();
}
