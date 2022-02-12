import { io as _io } from "socket.io-client";
import { writable as _writable } from "svelte/store";
const io = _io("localhost:3000");
const ioWritable = _writable(io);
export { ioWritable };
//# sourceMappingURL=io.js.map