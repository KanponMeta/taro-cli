import Taro from "@tarojs/taro";

type Method = keyof Taro.request.Method;
type Option<
  T,
  U extends string | TaroGeneral.IAnyObject | ArrayBuffer = any | any
> = Omit<Taro.request.Option<T, U>, "url" | "data" | "method">;

interface KpRequestBase {
  url: string;
  data?: any;
  contentType?: string;
}

class KpRequest {
  request<
    T = any,
    U extends string | TaroGeneral.IAnyObject | ArrayBuffer = any | any
  >(base: KpRequestBase, method: Method, options?: Option<T, U>) {
    const { url, data, contentType } = base;
    let contentTypeInitial = "application/json";
    contentTypeInitial = contentType || contentTypeInitial;

    const option: Taro.request.Option<T, U> = {
      url: url,
      data: data,
      method: method,
      timeout: 10000,
      header: {
        "content-type": contentTypeInitial,
      },
      ...options,
    };

    return Taro.request(option);
  }

  get<
    T = any,
    U extends string | TaroGeneral.IAnyObject | ArrayBuffer = any | any
  >(base: KpRequestBase, options?: Option<T, U>) {
    return this.request(base, "GET", options);
  }

  patch<
    T = any,
    U extends string | TaroGeneral.IAnyObject | ArrayBuffer = any | any
  >(base: KpRequestBase, options?: Option<T, U>) {
    return this.request(base, "PATCH", options);
  }

  post<
    T = any,
    U extends string | TaroGeneral.IAnyObject | ArrayBuffer = any | any
  >(base: KpRequestBase, options?: Option<T, U>) {
    return this.request(base, "POST", options);
  }

  put<
    T = any,
    U extends string | TaroGeneral.IAnyObject | ArrayBuffer = any | any
  >(base: KpRequestBase, options?: Option<T, U>) {
    return this.request(base, "PUT", options);
  }

  delete<
    T = any,
    U extends string | TaroGeneral.IAnyObject | ArrayBuffer = any | any
  >(base: KpRequestBase, options?: Option<T, U>) {
    return this.request(base, "DELETE", options);
  }
}

export default new KpRequest();
