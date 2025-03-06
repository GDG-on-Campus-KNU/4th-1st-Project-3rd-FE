// import { HttpResponse, http } from 'msw';

// import HTTP_API_END_POINT from '@_/constants/httpApiEndpoint';

// let responseData: BaseResponse<MessageResponse> = {
//   data: { message: 'hello' },
// };
// let statusCode: StatusCode = 200;

// export const GET = http.get(HTTP_API_END_POINT.testHttp, () => {
//   return HttpResponse.json(responseData, { status: statusCode });
// });

// export const MOCK_TEST_POST = http.post(
//   HTTP_API_END_POINT.mockTestHttp,
//   async ({ request }) => {
//     const { data, status } =
//       (await request.json()) as ResponseInMocking<MessageResponse>;
//     responseData = { data };
//     if (status) statusCode = status;
//     return HttpResponse.json({});
//   },
// );

// export default [GET, MOCK_TEST_POST];
