# ReactJS x TypeScript

- Create a react app with TypeScript: `npx create-react-app my-app --template typescript`
- You can use a typeto declare types for props.
  - https://fettblog.eu/typescript-react/
  - you can use the `?` on types to

## Typing Components

- Using the generic FunctionComponent allows you to include the optional children prop. However, using `React.FunctionComponent` is not recommended.
- If you need to type the props that you will pass into a component `React.HTMLAttribute` to define types. Example:
  - `React.HtmlHTMLAttributes<HTMLButtonElement>`
- If you are passing in a node, you can use `React.ReactNode`
- If you are passing in a component using the slots pattern, you can use `React.ComponentType`
- If you are passing in a component using the slots pattern with specific props, you can use a ReactHTML above. Example:
  - `React.ComponentType<React.HtmlHTMLAttributes<HTMLButtonElement>`
- If you are passing in an event handler, you can use the generic `React.ChangeEvent`
  - Example `React.ChangeEvent<HTMLInputElement>`

**Tags** [[ReactJS]], [[TypeScript]]
