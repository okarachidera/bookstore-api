import express, { Response, Request } from "express";
const router = express.Router();

router.get("/", (_req: Request, res: Response) => {
	res.redirect("/docs");
});

export default router;
