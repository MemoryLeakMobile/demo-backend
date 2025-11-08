import { Entity, Property, Opt, PrimaryKey } from '@mikro-orm/core';

@Entity()
export class User {
  @PrimaryKey()
  id!: number;

  @Property()
  createdAt: Date & Opt = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt: Date & Opt = new Date();

  @Property()
  name: string;

  @Property({ nullable: true })
  age?: number;

  constructor(name: string, age?: number) {
    this.name = name;
    this.age = age;
  }
}