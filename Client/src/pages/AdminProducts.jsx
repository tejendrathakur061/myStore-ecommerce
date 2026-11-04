import useProducts from "../hooks/useProducts";
import formatCurrency from "../utils/formatCurrency";

const AdminProducts = () => {
  const { products } = useProducts();

  return (
    <div className="min-h-[calc(100vh-4rem)] rounded-2xl border border-[#E7E5DC] bg-[#FCFCF8] p-6 sm:p-8">
      <div className="flex flex-col justify-between gap-4 border-b border-[#E8E6DD] pb-5 sm:flex-row sm:items-center">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#7C8576]">
            Store Management
          </p>
          <h1 className="text-2xl font-semibold tracking-tight text-[#293E30]">
            Products
          </h1>
          <p className="mt-2 text-sm text-[#777A70]">
            Manage your store products and inventory.
          </p>
        </div>

        <span className="w-fit rounded-lg bg-[#E8EEE5] px-4 py-2 text-sm font-semibold text-[#36563B]">
          {products.length} Products
        </span>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-[#E7E5DC] bg-white p-4">
          <p className="text-sm text-[#777A70]">Total Products</p>
          <p className="mt-2 text-2xl font-semibold text-[#293E30]">
            {products.length}
          </p>
        </div>

        <div className="rounded-xl border border-[#E7E5DC] bg-white p-4">
          <p className="text-sm text-[#777A70]">In Stock</p>
          <p className="mt-2 text-2xl font-semibold text-[#293E30]">
            {products.filter((product) => product.stock > 0).length}
          </p>
        </div>

        <div className="rounded-xl border border-[#E7E5DC] bg-white p-4">
          <p className="text-sm text-[#777A70]">Out of Stock</p>
          <p className="mt-2 text-2xl font-semibold text-[#293E30]">
            {products.filter((product) => product.stock === 0).length}
          </p>
        </div>
      </div>

      <div className="mt-8 overflow-hidden rounded-xl border border-[#E7E5DC]">
        <div className="overflow-x-auto">
          <table className="w-full min-w-150 text-left text-sm">
            <thead className="bg-[#F5F5F0] text-xs uppercase tracking-wider text-[#777A70]">
              <tr>
                <th className="px-5 py-4 font-semibold">Product</th>
                <th className="px-5 py-4 font-semibold">Category</th>
                <th className="px-5 py-4 font-semibold">Price</th>
                <th className="px-5 py-4 font-semibold">Stock</th>
                <th className="px-5 py-4 font-semibold">Status</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[#E7E5DC]">
              {products.length === 0 ? (
                <tr>
                  <td
                    colSpan="5"
                    className="px-5 py-10 text-center text-sm text-[#777A70]"
                  >
                    No products yet. Add your first product from the dashboard.
                  </td>
                </tr>
              ) : (
                products.map((product) => (
                  <tr
                    key={product.id}
                    className="transition-colors hover:bg-[#F8F8F3]"
                  >
                    <td className="px-5 py-4 font-medium text-[#293E30]">
                      {product.name}
                    </td>
                    <td className="px-5 py-4 text-[#777A70]">
                      {product.category}
                    </td>
                    <td className="px-5 py-4 font-medium text-[#293D30]">
                      {formatCurrency(product.price)}
                    </td>
                    <td className="px-5 py-4 text-[#62685D]">{product.stock}</td>
                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                          product.stock > 0
                            ? "bg-[#E8EEE5] text-[#36563B]"
                            : "bg-[#F8E9E5] text-[#A34D3D]"
                        }`}
                      >
                        {product.stock > 0 ? "In Stock" : "Out of Stock"}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminProducts;
