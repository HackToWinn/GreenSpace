export function extractJson(text: string): object | null {
    // Cari indeks kurung kurawal buka pertama dan kurung kurawal tutup terakhir
    const startIndex = text.indexOf('{');
    const endIndex = text.lastIndexOf('}');

    if (startIndex === -1 || endIndex === -1 || endIndex < startIndex) {
        // Jika tidak ada JSON yang valid ditemukan
        return null;
    }

    // Ekstrak substring yang kemungkinan adalah JSON
    const jsonString = text.substring(startIndex, endIndex + 1);

    try {
        // Coba parsing string tersebut
        return JSON.parse(jsonString);
    } catch (error) {
        // Jika parsing gagal, berarti bukan JSON yang valid
        console.error("Failed to parse extracted JSON:", error);
        return null;
    }
}