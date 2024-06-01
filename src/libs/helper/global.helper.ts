export const getAge = (birthDate: string) : number => {
    const today = new Date();
        const dob = new Date(birthDate);
        let age = today.getFullYear() - dob.getFullYear();
        const m = today.getMonth() - dob.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
            age--;
        }
    return age
}

export const dateToString = (date: Date) : string => {
    return date.toDateString()
}

export const generateMemberCode = () => {
    return `M${Date.now()}`
}

export const generateBookCode = () => {
    return `B${Date.now()}`
}


