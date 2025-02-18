type PagesMap = {
  homepage: string;
  about: string;
  contact: string;
};

type PagesAccess = {
  [Key in keyof PagesMap]?: boolean;
};

export function checkAccess(map: PagesMap): PagesAccess {
  const access: PagesAccess = {};
  Object.keys(map).map((elem: string) => {
    access[elem as keyof PagesMap] = true;
  });
  console.log(access);

  return access;
}

// Mapped training
//Readonly
type Person = {
  firstName: string
}

const person: Readonly<Person> = {
  firstName: 'John'
};

type ReadonlyTrained<T> = {
  readonly [Key in keyof T]: T[Key];
}

const person2: ReadonlyTrained<Person> = {
  firstName: 'John2',
}

// ReadonlyRemoval
type ReadonlyRemoval<T> = {
  -readonly [P in keyof T]: T[P]
}

// Partial

type PartialTrained<T> = {
  [P in keyof T]?: T[P];
}

// Required

type RequiredTrained<T> = {
  [P in keyof T]-?: T[P];
}

// Pick

type PickTrained<T, K extends keyof T> = {
  [Prop in K]: T[Prop];
}

// Omit

type OmitTrained<T, K extends keyof T> = {
  [Prop in keyof T as Prop extends K ? never : Prop]: T[Prop];
}

