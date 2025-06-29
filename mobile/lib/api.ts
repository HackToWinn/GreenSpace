const BASE_URL = process.env.EXPO_PUBLIC_API_URL_PROD;

//  Fetches JSON data from a URL and returns the response as a JSON object.
//  Throws an error if the response status is not 200.

const fetchJSON = async (url: string, options?: RequestInit) => {
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(`Error: ${response.status} ${response.statusText}`);
  }
  return response.json();
};

// Creates a new report by sending a POST request with the provided form data.

export const createReport = async ({ body }: { body: FormData }) => {
  try {
    return await fetchJSON(`${BASE_URL}/report/create`, {
      method: "POST",
      body,
    });
  } catch (error) {
    console.error("Failed to create report:", error);
    // Return null so caller can check for error
    return null;
  }
};

// Fetches the list of all reports from the server.

export const getReports = async () => {
  try {
    return await fetchJSON(`${BASE_URL}/report`);
  } catch (error) {
    console.error("Failed to fetch reports:", error);
    // Return an empty array so caller can handle it gracefully
    return [];
  }
};

// Fetches a report by its unique identifier.

export const getReportById = async (id: string) => {
  try {
    const response = await fetch(`${BASE_URL}/report/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch report with id ${id}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Failed to fetch report by ID:", error);
    return null;
  }
};


// Fetches the total number of reports for the current week from the server.

export const getWeekReports = async () => {
  try {
    return await fetchJSON(`${BASE_URL}/report/week`);
  } catch (error) {
    console.error("Failed to fetch total reports:", error);
    return [];
  }
};


// Fetches the most reported categories from the server.

export const getMostReportedCategories = async () => {
  try {
    return await fetchJSON(`${BASE_URL}/report/most/category`);
  } catch (error) {
    console.error("Failed to fetch most reported categories:", error);
    return null;
  }
};

// Registers a new user by sending a POST request with the provided form data.

export const registerUser = async ({ body }: { body: FormData }) => {
  try {
    return await fetchJSON(`${BASE_URL}/user/create`, {
      method: "POST",
      body,
    });
  } catch (error) {
    console.error("Failed to register user:", error);
    throw new Error("Registration failed");
  }
};

// Fetches the latest reports from the server.

export const getLatestReports = async () => {
  try {
    return await fetchJSON(`${BASE_URL}/report/latest`);
  } catch (error) {
    console.error("Failed to fetch latest reports:", error);
    return [];
  }
};

//Fetches all reports submitted by a user from the server.
export const getMyReports = async ({ body }: { body: FormData }) => {
  try {
    return await fetchJSON(`${BASE_URL}/report/my-report`, {
      method: "POST",
      body,
    });
  } catch (error) {
    console.error("Failed to fetch user reports:", error);
    return [];
  }
};

//  Fetches a user's profile information from the server.

export const getUserInfo = async ({ body }: { body: FormData }) => {
  try {
    return await fetchJSON(`${BASE_URL}/user/get`, {
      method: "POST",
      body,
    });
  } catch (error) {
    console.error("Failed to fetch user info:", error);
    return null;
  }
};
export const getUserBalance = async ({ body }: { body: FormData }) => {
  try {
    return await fetchJSON(`${BASE_URL}/user/token/balance`, {
      method: "POST",
      body,
    });
  } catch (error) {
    console.error("Failed to fetch user balance:", error);
    return null;
  }
};
export const getDailyTrends = async () => {
  try {
    return await fetchJSON(`${BASE_URL}/daily`, {
      method: "GET",
    });
  } catch (error) {
    console.error("Failed to fetch daily trends:", error);
    return null;
  }
};
export const getCategoryTrends = async () => {
  try {
    return await fetchJSON(`${BASE_URL}/category`, {
      method: "GET",
    });
  } catch (error) {
    console.error("Failed to fetch category trends:", error);
    return null;
  }
};
