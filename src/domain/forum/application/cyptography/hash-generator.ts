
export abstract class HashGenerator {
  abstract hash(hash: string): Promise<string>
}

  