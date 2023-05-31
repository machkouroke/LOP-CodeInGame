// @ts-ignore
import process from "react-syntax-highlighter/.eslintrc";


const IS_LOCAL: boolean = process.env["REACT_APP_IS_LOCAL"] === "true";

const BASE_URL: string = IS_LOCAL ? `http://${process.env["REACT_APP_BASE_LOCAL"]}` : `https://${process.env["REACT_APP_BASE"]}`;
const WEB_SOCKET_URL: string = IS_LOCAL ? `ws://${process.env["REACT_APP_BASE_LOCAL"]}` : `wss://${process.env["REACT_APP_BASE"]}`;


export {BASE_URL, WEB_SOCKET_URL}