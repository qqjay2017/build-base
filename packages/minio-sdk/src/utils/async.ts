/**
 * // 限制上传的片
 * @param arr  全部任务
 * @param limit 限制数
 * @param iterator 执行器  (item,callback)=>void,还没设计好
 * @param callback  结束回调  (err?)=>  有err说明报错
 * @returns
 */
export const eachLimit = function (arr = [], limit = 3, iterator, callback) {
  let _callback = callback || function () {};

  if (!arr.length || limit <= 0) {
    return callback();
  }

  let completed = 0;
  let started = 0;
  let running = 0;

  // 填充
  (function replenish() {
    if (completed >= arr.length) {
      return _callback();
    }

    while (running < limit && started < arr.length) {
      started += 1;
      running += 1;
      // eslint-disable-next-line no-loop-func
      iterator(arr[started - 1], (err) => {
        if (err) {
          _callback(err);
          // 报错了,不走了,停止while
          _callback = function () {};
        } else {
          completed += 1;
          // running -1 接着while
          running -= 1;

          if (completed >= arr.length) {
            _callback();
          } else {
            replenish();
          }
        }
      });
    }
  })();
};
// TODO 重试 重试三次
export const retry = function (times = 3, iterator, callback) {
  const next = function (index) {
    iterator((err, data) => {
      if (err && index < times) {
        next(index + 1);
      } else {
        callback(err, data);
      }
    });
  };

  if (times < 1) {
    callback();
  } else {
    next(1);
  }
};

export const async = {
  eachLimit,
  retry,
};
