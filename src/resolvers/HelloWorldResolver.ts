import 'reflect-metadata';
import { Query, Resolver } from 'type-graphql';

@Resolver()
export class HelloWorldResolver {
    @Query(() => String)
    hello(): string {
        return 'hi!';
    }
}
