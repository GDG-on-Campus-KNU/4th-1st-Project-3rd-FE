// import { HttpResponse } from 'msw';

// export default class MswHttpResponser<
//   NormalData = SuccessResponseWithMsg,
//   ErrorData = ErrorResponseWithMsg,
// > {
//   #statusCode: StatusCode = 200;
//   #jsonData: NormalData | ErrorData;

//   constructor(initData: NormalData, statusCode?: StatusCode) {
//     this.#jsonData = initData;
//     if (statusCode) this.#statusCode = statusCode;
//   }

//   getResponse() {
//     return HttpResponse.json(
//       { body: this.#jsonData },
//       { status: this.#statusCode },
//     );
//   }

//   setResponse(initData: NormalData, statusCode?: StatusCode) {
//     this.#jsonData = initData;
//     if (statusCode) this.#statusCode = statusCode;
//   }
// }
