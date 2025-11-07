// Loader.jsx
import React from "react";

const Loader = () => {
  return (
 <div class="animate-spin inline-block size-4 border-3 border-current border-t-transparent text-gray-300 mr-3 rounded-full" role="status" aria-label="loading">
  <span class="sr-only">Loading...</span>
</div>
  );
};

export default Loader;
