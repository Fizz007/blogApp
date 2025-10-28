import React from "react";
import { Link } from "react-router-dom";

export default function Breadcrumb({ items }) {
  return (
    <nav className="text-sm">
      <ol className="flex items-center space-x-2">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={index} className="flex items-center">
              {!isLast ? (
                <>
                  <Link
                    to={item.href}
                    className="text-[#A6A6A6] hover:text-[#000000] font-medium transition-colors"
                  >
                    {item.label}
                  </Link>
                  <span className="mx-2 text-gray-400">›</span>
                </>
              ) : (
                <span className="text-[#4B73E0] font-semibold">
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
