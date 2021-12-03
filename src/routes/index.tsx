import { Switch, Route } from "react-router-dom";
import { Dashboard } from "../screens/Dashboard";
import { Repo } from "../screens/Repo";

export function Routes() {
  return (
    <Switch>
      <Route path="/" component={Dashboard} exact />
      <Route path="/repositories/:repository+" component={Repo} />
    </Switch>
  );
}
