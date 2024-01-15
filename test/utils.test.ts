import { nestedAssign } from "../src/utils";

test("nested-assign", () => {
  const t1 = {
    person: {
      name: "asdf",
      age: 3,
    },
  };
  nestedAssign(t1, {
    person: { name: "foo" },
    pet: {
      name: "bar",
      age: 10,
    },
  });
  expect(t1).toStrictEqual({
    person: {
      name: "foo",
      age: 3,
    },
    pet: {
      name: "bar",
      age: 10,
    },
  });
  nestedAssign(t1, { pet: { age: undefined } });
  expect(t1).toStrictEqual({
    person: {
      name: "foo",
      age: 3,
    },
    pet: {
      name: "bar",
      age: undefined,
    },
  });
  nestedAssign(t1, { pet: { age: 3 } });
  expect(t1).toStrictEqual({
    person: {
      name: "foo",
      age: 3,
    },
    pet: {
      name: "bar",
      age: 3,
    },
  });
  nestedAssign(t1, { pet: undefined });
  expect(t1).toStrictEqual({
    person: {
      name: "foo",
      age: 3,
    },
    pet: undefined,
  });
  nestedAssign(t1, { person: undefined });
  expect(t1).toStrictEqual({
    person: undefined,
    pet: undefined,
  });
});
