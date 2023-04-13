# Vite Plugin fro vue-md-shiki-components Copy Assets

## Getting Started

Copy Assets:

```bash
npm install -D vite-plugin-vmsc
```

Modify your `vite.config.*` file:

```typescript
import { copyPublicPlugin } from 'vite-plugin-vmsc'

export default defineConfig(() => {
  // ...
  plugins: [
    // ...
    // add this line:
    copyPublicPlugin()
})

```

For more detailed usage instructions, please see the [Example](./example).

## Contributing

Contributions are welcome! If you find a bug or have a feature request, please open an issue on GitHub. If you'd like to contribute code, please fork the repository and submit a pull request.

## License

This component library is licensed under the MIT License.
