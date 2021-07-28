## Using TypeScript

  - Typescript is used in `.ts` files. 
  - `npm install -g typescript`
  - Compile files with `tsc myfile.ts`
  - `ts-node` is a library which you can use to compile and watch files live: https://www.npmjs.com/package/ts-node
  - to read: utility types: https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeystype

## General Principles
  - Bias towards more loosely typed inputs (for flexibility), and tightly typed outputs (for predictibility).

## Types

### Primitive Types
  - **primitives**:
      - `string`
      - `number`, `bigint`
      - `boolean`
  - **primitive types** in [[JavaScript]], from `typeof`
      - `undefined`
      - `number`
      - `string`
      - `boolean`
      - `bigint`
      - `symbol`
      - `object`
      - `function`
  - `any` - typeless type. Assigned to variables that could be anything. 
  - `void` -  type for function returns for functions that don't return anything.
  - `unknown` tells the compiler that we don't know what it is. You can't reassign a type with unknown but you can with anything. You cannot access any functions or properties on an unknown variable but you can on an `any`. 
  - Types can be used to make sure a value is one of a certain group: 
  - `type Fruits = 'apple' | 'banana' | 'orange' | 'grape'`

### Collection Types
  - **array** - add [] to a primitive or interface. example:
      - `string[]` - array of strings.
  - **tuple** - array with a fixed set of known types
      - `let teamScore = [string, number]`

### Object Types
  - Used to declare interfaces for objects.

  ```
  interface Sportsball {
    HomeTeam: string,
    AwayTeam: string,
    HomeScore: number,
    AwayScore: number
  }
  ```
  
You can also add `readonly` to a property to make it immutable. #[[immutability]]:

  ```
  interface Sportsball {
    readonly HomeTeam: string,
    readonly AwayTeam: string,
    HomeScore: number,
    AwayScore: number
  }
  ```

## Enums
- declare enums with the enum type, a way to declare numberic variables. note that in the below example, Baseball would be 2, Basketball 3, etc.:
  ```
  enum SportsTypes {
    Football = 1,
    Baseball,
    Basketball,
    Hockey
  }
  ```

## Unions
Unions are an alternative to Enums. Examples of unions: 

type SportsType = 'Football' | 'Baseball' | 'Basketball' | 'Hockey'

## Annotations
  - function argument annotations
    - `function calculateWinnings(amount:number, price:number)`
  - function return annotations
        - `function calculateWinnings(amount:number, price:number):number`
  - Can you `?` to make fields optional. 

## Type Assertions  
  - you can use these to assert that a variable is a certain type, even though these are often seen as a code smell: 
      - const result = myApiRequest() as ApiResult
      - A better approach would be user-defined Type Guards:
        - `function isFish(pet: Fish | Bird): pet is Fish { return (pet as Fish).swim !== undefined; }`xw
      - TypeScript recognized primitive `typeof` operators as type guards. 

## Generics
  - Generics allow you to capture a type and re-use it later in the definition. For example, this function could take any and return any, so it could in theory take a string and return a number: 
      - `const identity(arg: any): any => arg`
  - However in this version, the type of the arg and the return value must match: 
      - `const identity<Type>(arg: Type): Type => arg`
  - Type can be anything, so long as you are consistent in your function definitions
  - Generics can be used to create **Generic interfaces** or **Generic classes**

  ```
  interface GenericSportsBall<TeamType, ScoreType> {
    HomeTeam: TeamType,
    AwayTeam: AwayType,
    HomeScore: ScoreType,
    AwayScore: ScoreType
  }
  ```
  - You can also use Generics that extend existing types to ensure certain functionality: 

```
interface GenericSportsBall<TeamType extends String, ScoreType extends Number> {}
```
  - Another more complex example, using Generics to ensure that a function takes an argument with two generic types, and returns a value with the same generic types:
  ```
  const mergeMaps = 
        (m1: Map<KeyType, ValType>,
        m2: Map<KeyType, ValType>
        ): Map<KeyType, ValType => ...
  ```

## Utility Types
  - **Documentation:** https://www.typescriptlang.org/docs/handbook/utility-types.html
  - Several Types used to facilitate type transformations. 

## tsconfig.json
  - [tsconfig schema](http://json.schemastore.org/tsconfig)
  - Found in a create-react-app  with typescript.
  - Tells the TypeScript compiler how to handle the project; which files or folders to treat as typescript, along with certain options.
  - You can use the extends option to extend existing configurations from [github.com/tsconfig/bases](https://github.com/tsconfig/bases/)

## .d.ts files
  - convention to store types in a single file. 
## TypeScript x React
  - **Tags** #[[ReactJS]]
  - Create a react app with TypeScript: `npx create-react-app my-app --template typescript`
  - You can use a typeto declare types for props. 
      - https://fettblog.eu/typescript-react/
      - you can use the `?` on types to 
      - Using the generic FunctionComponent allows you to include the optional children prop.

  ```
  type blogProps = { title: string, content?: string }
  const BlogPost = ({title, content }: blogProps) => <div />
  // or
  const BlogPost = (props:blogProps) => <div />
  // or
  const BlogPost: FunctionComponent<BlogProps> = ({ title, content }) => <div/>
  ```

  - You can use the Component generic for class components. You also need a type for the state. 
      - `class BlogPost extends Component<BlogProps, BlogState>`
  - React has built-in types for all different kinds of events, examples are `MouseEvent, InputEvent`,

## TypeScript x JSON
  - You can use variable declaration to more strictly type with explicit declarations

  ```
  interface MyObj {
    myString: string;
    myNumber: number;
  }
  let obj: MyObj = JSON.parse('{ "myString": "string", "myNumber": 4 }');
  ```
  -  To import a JSON file, you can add the following to your `tsconfig.json`
  ```
  {
  "compilerOptions": {
    "resolveJsonModule": true,
    "esModuleInterop": true  

  }
  ```

