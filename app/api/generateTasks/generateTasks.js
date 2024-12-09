const axios = require('axios');

// Replace hardcoded API key with environment variable
const API_KEY = process.env.OPENAI_API_KEY;

// Function to call GPT-4 API
export async function generateTasks(userInfo, cityInfo) {
    const prompt = `
You are a task generator AI. Given user information, a pop-up city location, and main topics, generate engaging tasks for the user to perform during their stay. Each task should include:
1. Task Title
2. Task Description
3. Category
4. Points
5. Duration (in hours)
6. Range of participants (e.g., 1, or 2-5 people)
7. Required Skills

User Info:
Name: ${userInfo.name}
Job: ${userInfo.job}
Skills: ${userInfo.skills.join(", ")}
Sports: ${userInfo.sports.join(", ")}
Interests: ${userInfo.interests.join(", ")}
Availability: ${userInfo.availability}

Pop-up City:
Location: ${cityInfo.location}
Duration: ${cityInfo.duration} weeks
Topics: ${cityInfo.topic}

It's for users to get ideas of what to do when attending pop-up cities. A pop-up city is a one month long gathering of people that like to share skills, do activites together, work and create new things. It's usually centered around a theme and brings a given community together that is already bonded by something (a given technology, a sport etc)

Generate 10 tasks in a CSV format, including the header row.

These are the broader tasks categories : sport, community, explore, wellness, building

Keep the title and the task description quite short, 1-2 sentences max

The first line should be the CSV headers:
"Task Title","Task Description","Category","Points","Duration (hours)","Participants (range)","Required Skills"

Follow with 10 tasks in CSV format:
Example:
"Task Title","Task Description","Category","Points","Duration (hours)","Participants (range)","Required Skills"
    `;

    const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
            model: "gpt-4o",
            messages: [{ role: "system", content: prompt }],
            temperature: 0.7,
        },
        {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${API_KEY}`,
            },
        }
    );

    return response.data.choices[0].message.content;
}

// Test Data
const userInfo = {
    name: "John Doe",
    job: "Dev",
    skills: ["Smart contract development", "Databases"],
    sports: ["Running", "KiteSurfing"],
    interests: ["ZK proofs"],
    availability: "medium",
};

const cityInfo = {
    location: "Pattaya",
    duration: 4, // weeks
    topic: "Cryptography, blockchain, mindfulness, networking",
};

// Generate Tasks
(async () => {
    try {
        const csvTasks = await generateTasks(userInfo, cityInfo);

        // Write the CSV to a file
        const filePath = './tasks.csv';
        fs.writeFileSync(filePath, csvTasks);
        console.log(`Tasks generated successfully and saved to ${filePath}`);
    } catch (error) {
        console.error("Error generating tasks:", error.message);
    }
})();
