import dva from 'dva';
import { message } from 'antd';
import createLoading from 'dva-loading';
import './index.css';

// 1. Initialize
const app = dva({
  onError(e) {
    message.error(e.message, /* duration */3);
  },
});

app.model(require("./models/app"));
app.model(require("./models/tasks"));
app.model(require("./models/users"));
app.model(require("./models/branches"));
app.model(require("./models/notices"));
app.model(require("./models/parts"));

// 2. Plugins
// app.use({});
app.use(createLoading());

// 3. Model
// app.model(require('./models/example'));

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');
