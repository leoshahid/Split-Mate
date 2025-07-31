// Safe JSON serialization utility
export const safeSerialize = (obj) => {
    try {
        return JSON.stringify(obj);
    } catch (error) {
        console.error('Serialization error:', error);
        return '{}';
    }
};

export const safeDeserialize = (str) => {
    try {
        return JSON.parse(str);
    } catch (error) {
        console.error('Deserialization error:', error);
        return {};
    }
}; 