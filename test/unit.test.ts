import { runTest } from "./util";
import { unitTests } from "./suite/unit";

unitTests.requirements.forEach(runTest);
