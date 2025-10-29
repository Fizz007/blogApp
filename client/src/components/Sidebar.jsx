import { useMemo } from "react";

const Sidebar = ({ categories, currentCategory }) => {
  const sortedCategories = useMemo(() => {
    if (!currentCategory) return categories;
    const active = categories.find((cat) => cat._id === currentCategory._id);
    const others = categories.filter((cat) => cat._id !== currentCategory._id);
    return active ? [active, ...others] : categories;
  }, [categories, currentCategory]);

  return (
    <aside className="bg-secondary/30 rounded-lg overflow-hidden">
      <div className="p-6 pb-8 border-1 rounded-lg border-[#D9D9D9]">
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="w-[158px] h-[158px] rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex-shrink-0 overflow-hidden">
            <img
              src="../sidebar.png"
              alt="Sloan AI Assistant"
              className="w-full h-full object-cover"
            />
          </div>

          <div>
            <h3 className="text-lg font-medium text-foreground mb-2">
              <span className="text-[#5585FF]">Let Sloan </span>
              Summarize It for You
            </h3>
            <p className="text-sm font-normal text-muted-foreground leading-relaxed">
              Save time and focus on what matters with Sloan's smart summaries.
            </p>
          </div>

          <button className="w-full border-primary/20">Summarize Now</button>
        </div>
      </div>

      {/* Categories */}
      <div className="pt-[32px]">
        <h3 className="text-xl font-medium text-foreground pb-[24px]">
          Categories
        </h3>

        <div className="space-y-[8px]">
          {sortedCategories.map((category) => {
            const isActive =
              currentCategory?._id === category._id ||
              currentCategory?.title === category.title;

            return (
              <button
                key={category._id}
                className={`w-full flex items-center justify-between py-3 pl-[16px] gap-[8px] text-left border-1 rounded-lg border-[#D9D9D9] transition
                  ${isActive ? "bg-[#F5F8FF] border-[#5585FF]" : "hover:bg-gray-50"}
                `}
              >
                <span
                  className={`text-sm font-semibold ${
                    isActive ? "text-[#5585FF]" : "text-[#151515]"
                  }`}
                >
                  {category.title}
                </span>
                <span
                  className={`text-sm font-normal p-[16px] ${
                    isActive ? "text-[#5585FF]" : "text-muted-foreground"
                  }`}
                >
                  {category.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar