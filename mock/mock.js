// 引入mockjs
import Mock from "mockjs";
// 获取 mock.Random 对象
const Random = Mock.Random;
// mock一组数据

const chartsApi = () => {
  let data = [];

  for (let i = 0; i < 10; i++) {
    let obj = {
      date: Random.date(), // Random.date()指示生成的日期字符串的格式,默认为yyyy-MM-dd；
      accessuser: Random.natural(3000, 5000),
      dailyactiveuser: Random.natural(2000, 3000)
    };
    data.push(obj);
  }

  return {
    data: data
  };
};

export default {
  chartsApi
};
