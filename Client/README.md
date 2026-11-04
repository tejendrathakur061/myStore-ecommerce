# MyStore E-commerce

A client-side shopping application built with React, React Router, Vite, and
Tailwind CSS. Customers can browse and search products, manage a cart, and
place orders. Admins can add products and review inventory, customers, and
orders.

## Run locally

```sh
npm install
npm run dev
```

Build and lint:

```sh
npm run build
npm run lint
```

## Main routes

Customer routes:

- `/products` - Browse, search, and filter the catalog.
- `/products/:id` - View a product.
- `/cart` - Update quantities and review totals.
- `/checkout` - Enter delivery details and place an order.
- `/orders` - View the signed-in customer's order history.
- `/profile` - View account information.

Admin routes:

- `/admin/dashboard` - Add a product.
- `/admin/products` - Review inventory.
- `/admin/users` - Review registered accounts.
- `/admin/orders` - Review all orders and store totals.

The root route redirects signed-in customers to the catalog and admins to the
admin dashboard. Signed-out visitors are sent to login.

## Shared state and persistence

`src/context/AppProvider.jsx` owns shared products, users, authentication,
cart, and order state. Domain contexts and custom hooks are in `src/context`
and `src/hooks`. `src/utils/LocalHelper.js` continues to read and write the
existing localStorage keys, so product, cart, user, and order data remain
available in the same browser.

This is a frontend demonstration, not a production commerce backend.
Authentication and browser-stored data are not secure for real customer
accounts or payments. Use a server-side API and a trusted payment provider
before deploying a real store.

For a detailed explanation of state ownership, persistence, and workflows,
see [CONTEXT_API_IMPLEMENTATION.txt](./CONTEXT_API_IMPLEMENTATION.txt).
