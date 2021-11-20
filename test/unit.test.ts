import { unitTests } from "./suite/unit";
import { runTest } from "./util";

unitTests.requirements.forEach(runTest);
