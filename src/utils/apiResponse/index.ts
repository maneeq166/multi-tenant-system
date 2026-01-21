export class ApiResponse {
  data: any;
  statusCode:number;
  message:string;
  success:boolean;
  constructor(statusCode: number, data: any, message = "success") {
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
    this.success = statusCode < 400;
  }
}


