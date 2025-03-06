// import { HttpResponse, http, ws } from 'msw';

// import HTTP_API_END_POINT from '@_/constants/httpApiEndpoint';
// import WEBSOCKET_API_END_POINT from '@_/constants/websocketEndpoint';

// const socket = ws.link(WEBSOCKET_API_END_POINT.testWebsocket);

// const responseData = 'data';
// const statusCode: StatusCode = 200;

// let send: () => void;
// const handleOpen = socket.addEventListener('connection', ({ client }) => {
//   send = () => client.send(responseData);
// });

// const POST = http.post(HTTP_API_END_POINT.mockTestWebsocket, () => {
//   send();
//   return HttpResponse.json({});
// });
// // export const MOCK_TEST_POST = http.post(
// //   HTTP_API_END_POINT.mockTestHttp,
// //   async ({ request }) => {
// //     const { data, status } =
// //       (await request.json()) as ResponseInMocking<MessageResponse>;
// //     responseData = { data };
// //     if (status) statusCode = status;
// //     return HttpResponse.json({});
// //   },
// // );

// export default [handleOpen, POST];
