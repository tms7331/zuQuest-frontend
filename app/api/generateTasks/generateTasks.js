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
Make it so that it's still very personalized to the user, very sensitive to their skills and interests so that there's different outputs for different profiles.
Generate 10 tasks in a CSV format, including the header row.

These are the broader tasks categories : sport, community, explore, wellness, building

Keep the title and the task description quite short, 1-2 sentences max

The first line should be the CSV headers:
"Task Title","Task Description","Category","Points","Duration (hours)","Participants (range)","Required Skills"

Follow with 10 tasks in CSV format:
Example:
"Task Title","Task Description","Category","Points","Duration (hours)","Participants (range)","Required Skills"
    `;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
            model: "gpt-4",
            messages: [{ role: "system", content: prompt }],
            temperature: 0.7,
        })
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
}