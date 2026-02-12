import { SessionUser } from "@/types/user";
import {auth} from "@/auth";

export function withAuth<T extends unknown[], R>(
    fn: (user: SessionUser, ...args: T) => Promise<R>
) {
    return async (...args: T): Promise<R> => {
        const session = await auth();

        if (!session?.user) {
            throw new Error("You must be logged in to access this resource");
        }

        return fn(session.user as SessionUser, ...args);
    };
}
