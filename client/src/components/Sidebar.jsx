

const Sidebar = ({ categories }) => (
  <>
    <aside className="bg-secondary/30 rounded-lg overflow-hidden">
      <div className="p-6 pb-8 border-3 rounded-lg border-[#D9D9D9]">
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="w-[158px] h-[158px] rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex-shrink-0 overflow-hidden">
            <img
              src="../sidebar.png"
              alt="Sloan AI Assistant"
              className="w-full h-full object-cover"
            />
          </div>

          <div>
            <h3 className="text-lg font-mdeium text-foreground mb-2">
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
      <div className="pt-[32px] pt-8">
        <h3 className="text-xl font-medium text-foreground pb-[24px]">
          Categories
        </h3>

        <div className="space-y-[8px]">
          {categories.map((category, index) => (
            <button
              key={index}
              className={`w-full flex items-center justify-between py-3 pl-[16px] gap-[8px] text-left group 
                ${index === 0 ? "text-[#5585FF]" : ""} 
                border-3 rounded-lg border-[#D9D9D9]`}
            >
              <span
                className={`text-sm font-semibold ${
                  index === 0 ? "text-[#5585FF]" : "text-[#151515]"
                }`}
              >
                {category.title}
              </span>
              <span className="text-sm font-normal text-muted-foreground p-[16px]">
                {category.count}
              </span>
            </button>
          ))}
        </div>
      </div>
    </aside>
  </>
);

export default Sidebar;