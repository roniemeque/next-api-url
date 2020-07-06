# Next.js Absolute API URL Helper

[![roniemeque](https://circleci.com/gh/roniemeque/next-api-url.svg?style=shield)](https://app.circleci.com/pipelines/github/roniemeque/next-api-url)

This package provides a quick solution around the common Next.js error that happens while trying to fetch data in the server side without providing a full url:

`Server Error: Only absolute URLs are supported`

Why does this happen though? Since these data fetching functions run only on the server, they have no way of knowing the `origin` like code on the client side does, so Next.js reminds you that an absolute URL has to be provided.

**Warning**: this helper only works for `getServerSideProps` and `getInitialProps` (both client and server) -- For `getStaticProps` you should either hard code the URL or use enviroment variables.

## Usage

Simply provide the context to the function:

```javascript
import apiUrl from "next-api-url";

fetch(`${apiUrl(ctx)}/posts`); // http://localhost:3000/api
fetch(`${apiUrl(ctx)}/posts`); // https://blog.com/api
fetch(`${apiUrl({ req: ctx.req })}/posts`); // https://blog.com/api
fetch(`${apiUrl({ req: ctx.req })}/posts`, false); // https://blog.com
```

## Examples

### getServerSideProps

```typescript
import apiUrl from "next-api-url";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const posts = await (await fetch(`${apiUrl(context)}/api/posts`)).json();

  return {
    props: { posts },
  };
};
```

### getInitialProps (works on server and client 😊)

```typescript
import apiUrl from "next-api-url";

Page.getInitialProps = async (context) => {
  const posts = await (await fetch(`${apiUrl(context)}/api/posts`)).json();

  return {
    posts,
  };
};
```

### getServerSideProps using wrapper

```typescript
import { withApiUrl } from "next-api-url";

export const getServerSideProps = withApiUrl(async (context, url) => {
  const posts = await (await fetch(`${url}/api/posts`)).json();

  return {
    props: {
      posts,
    },
  };
});
```

### getInitialProps using wrapper

```typescript
import { withApiUrl } from "next-api-url";

Page.getInitialProps = withApiUrl(async (context, url) => {
  const posts = await (await fetch(`${url}/api/posts`)).json();

  return {
    posts,
  };
});
```
