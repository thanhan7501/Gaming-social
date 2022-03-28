const verifyAdmin = (user) => {
    return user.role === "admin";
};