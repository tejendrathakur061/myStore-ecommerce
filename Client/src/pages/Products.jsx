import { useMemo, useState } from "react";
import ProductCard from "../components/ProductCard";
import useDebounce from "../hooks/useDebounce";
import useProducts from "../hooks/useProducts";

const Products = () => {
  const { products } = useProducts();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery);

  const categories = useMemo(
    () =>
      [...new Set(products.map((product) => product.category).filter(Boolean))]
        .sort((first, second) => first.localeCompare(second)),
    [products],
  );

  const filteredProducts = useMemo(() => {
    const query = debouncedSearchQuery.trim().toLowerCase();

    return products.filter((product) => {
      const matchesSearch = [
        product.name,
        product.description,
        product.category,
      ].some((value) => value?.toLowerCase().includes(query));
      const matchesCategory =
        !selectedCategory || product.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [products, debouncedSearchQuery, selectedCategory]);

  return !products || products.length === 0 ? (
    <div className="flex min-h-[50vh] flex-col items-center justify-center px-5 text-center">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#E8EDE7]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8 text-[#293E30]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M20 13V7a2 2 0 00-2-2H6a2 2 0 00-2 2v10a2 2 0 002 2h8m6-6l-4 4m0-4l4 4M8 10h8M8 14h4"
          />
        </svg>
      </div>

      <h2 className="text-xl font-semibold text-[#293E30]">
        No Products Found
      </h2>

      <p className="mt-2 max-w-sm text-sm leading-6 text-[#777A70]">
        We couldn't find any products at the moment. Please check back later for
        new arrivals.
      </p>
    </div>
  ) : (
    <div className="min-h-screen bg-[#F5F5F0] px-5 py-8 text-[#292D28] sm:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="relative mb-10 h-56 w-full overflow-hidden rounded-xl">
          <img
            src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=1600"
            alt="Shop Banner"
            className="absolute inset-0 h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-black/40"></div>

          <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white">
            <h1 className="text-2xl font-bold sm:text-3xl">
              Discover Amazing Products
            </h1>
            <p className="mt-2 text-sm sm:text-base text-gray-200">
              Handpicked items just for you — shop now!
            </p>
            <div className="mt-3 h-0.75 w-16 rounded-full bg-white"></div>
          </div>
        </div>

          <div className="mb-6 flex flex-col gap-3 sm:flex-row">
            <label className="flex-1">
              <span className="sr-only">Search products</span>
              <input
                type="search"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search products by name, description, or category"
                className="w-full rounded-lg border border-[#DEDED4] bg-[#FCFCF8] px-4 py-3 text-sm text-[#292D28] outline-none transition placeholder:text-[#96988E] focus:border-[#526B54] focus:ring-2 focus:ring-[#293E30]/10"
              />
            </label>

            <label>
              <span className="sr-only">Filter by category</span>
              <select
                value={selectedCategory}
                onChange={(event) => setSelectedCategory(event.target.value)}
                className="w-full rounded-lg border border-[#DEDED4] bg-[#FCFCF8] px-4 py-3 text-sm text-[#292D28] outline-none transition focus:border-[#526B54] focus:ring-2 focus:ring-[#293E30]/10 sm:min-w-52"
              >
                <option value="">All categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </label>
          </div>

          {filteredProducts.length === 0 ? (
            <p className="rounded-xl border border-[#E7E5DC] bg-[#FCFCF8] px-5 py-8 text-center text-sm text-[#777A70]">
              No products match your search or category filter.
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
      </div>
    </div>
  );
};

export default Products;
