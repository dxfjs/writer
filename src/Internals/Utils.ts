export const applyFlags = (...flags: number[]) => {
	return flags.reduce((sum, flag) => {
		return sum + flag;
	}, 0);
};
