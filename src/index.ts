import * as dotenv from 'dotenv'
import app from "./server";

app.listen(3001, () => {
  console.log("im listening");
});
