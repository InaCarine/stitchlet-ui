export type ClassValue =
  | ClassArray
  | ClassDictionary
  | string
  | number
  | bigint
  | null
  | boolean
  | undefined;
export type ClassDictionary = Record<string, boolean | undefined>;
export type ClassArray = ClassValue[];

function toVal(mix: ClassValue): string {
  let str = '';

  if (typeof mix === 'string' || typeof mix === 'number') {
    str += mix;
  } else if (Array.isArray(mix)) {
    for (let i = 0; i < mix.length; i++) {
      const v = mix[i];
      if (v) {
        const y = toVal(v);
        if (y) {
          if (str) str += ' ';
          str += y;
        }
      }
    }
  } else if (mix && typeof mix === 'object') {
    const dict = mix as ClassDictionary;
    for (const k in dict) {
      if (Object.prototype.hasOwnProperty.call(dict, k) && dict[k]) {
        if (str) str += ' ';
        str += k;
      }
    }
  }

  return str;
}

export function clsx(...args: ClassValue[]): string {
  let str = '';
  for (let i = 0; i < args.length; i++) {
    const tmp = args[i];
    if (tmp) {
      const x = toVal(tmp);
      if (x) {
        if (str) str += ' ';
        str += x;
      }
    }
  }
  return str;
}
