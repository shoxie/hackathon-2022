const TrustView = () => {
  return (
    <>
      <div className="pt-20 text-center">
        <div>
          <span className="text-2xl font-semibold text-secondary">23</span>
        </div>
        <div>
          <span className="text-2xl font-medium text-gray-400">
            là số điểm uy tín của bạn
          </span>
        </div>
      </div>
      <div className="p-3 border border-gray-400 rounded-xl">
        <div>
          <div>
            <span className="text-2xl font-semibold">Mách bạn</span>
          </div>
          <p className="font-medium text-gray-400 text-md">
            Mỗi lần hoàn thành và đánh giá một địa điểm du lịch trong khoảng
            thời gian đã chọn, bạn sẽ được cộng một điểm uy tín đó nhe. Điểm uy
            tín càng cao thì sẽ càng có nhiều mã ưu đãi đó~
          </p>
        </div>
      </div>
    </>
  );
};

export default TrustView;
