import { LoginUser } from "./user";

export interface IVote {
    rate: number;
    comment: string;
}
export interface IVoteRequest extends IVote {
    reviewDetailId: number;
}
export interface IVoteResponse extends IVote {
    id: number;
    voteOwner: LoginUser;
}
export interface GetAllReviewsResonse {
    count: number;
    pageIndex: number;
    pageSize: number;
    data: IVoteResponse[];
}
