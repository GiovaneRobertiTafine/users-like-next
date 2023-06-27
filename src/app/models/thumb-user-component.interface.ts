export default interface ThumbUserComponent {
    user: any;
    nextUser: () => void;
    followUser: (user: any) => void;
    unfollowUser: (user: any) => void;
} 