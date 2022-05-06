import StarRating from "./Stars";

const traffic = ["Ít người", "Bình thường", "Quá tải"];

const categories = [
  {
    name: "Điểm tham quan",
    children: [
      "Thiên nhiên và vườn bách thảo",
      "Công viên và công viên nước",
      "Cáp treo và ngắm cảnh",
    ],
  },
  {
    name: "Hoạt động ngoài trời",
    children: ["Cắm trại", "Trải nghiệm cảm giác mạnh"],
  },
  {
    name: "Vui chơi giải trí",
  },
];

const Filter = () => {
  return (
    <>
      <div className="flex flex-col p-3 px-5 space-y-5 border border-gray-400 rounded-2xl">
        <div>
          <div>
            <span className="text-xl font-medium">Lưu lượng</span>
          </div>
          <div className="flex flex-col items-start pt-3 space-y-2">
            {traffic.map((item, index) => (
              <div key={index} className="flex flex-row items-center space-x-5">
                <input type="checkbox" className="w-4 h-4" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div>
            <span className="text-xl font-medium">Đánh giá</span>
          </div>
          <div className="flex flex-col items-start pt-3 space-y-2">
            {Array.from([1, 2, 3, 4, 5]).map((item, index) => (
              <div key={index} className="flex flex-row items-center space-x-5">
                <input type="checkbox" className="w-4 h-4" />
                <StarRating rating={item} />
              </div>
            ))}
          </div>
        </div>
        <div>
          <div>
            <span className="text-xl font-medium">Danh mục</span>
          </div>
          <div className="flex flex-col items-start pt-3 space-y-2">
            {categories.map((item, index) => (
              <>
                <div
                  key={index}
                  className="flex flex-row items-center space-x-5"
                >
                  <input type="checkbox" className="w-4 h-4" />
                  <span>{item.name}</span>
                </div>

                {item.children && (
                  <div className="flex flex-col items-start pl-5 space-y-2">
                    {item.children.map((child, index) => (
                      <div
                        key={index}
                        className="flex flex-row items-center space-x-5"
                      >
                        <input type="checkbox" className="w-4 h-4" />
                        <span>{child}</span>
                      </div>
                    ))}
                  </div>
                )}
              </>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Filter;
