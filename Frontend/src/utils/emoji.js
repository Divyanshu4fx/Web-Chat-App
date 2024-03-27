export const getRandomEmoji = ()=> {
    const emojis = [
        "💼", // Briefcase
        "📈", // Chart Increasing
        "💻", // Laptop
        "📅", // Calendar
        "⏰", // Alarm Clock
        "🏢", // Office Building
        "💡", // Light Bulb
        "📝", // Memo
        "📎", // Paperclip
        "📚", // Books
        "🔍", // Magnifying Glass
        "🔧", // Wrench
        "🔨", // Hammer
        "⚙️", // Gear
        "🛠️", // Hammer and Wrench
        "👔", // Necktie
        "👩‍💼", // Woman Office Worker
        "👨‍💼", // Man Office Worker
        "💪", // Flexed Biceps
        "🏋️‍♂️", // Man Lifting Weights
        "🏋️‍♀️", // Woman Lifting Weights
        "⛹️‍♂️", // Man Bouncing Ball
        "⛹️‍♀️", // Woman Bouncing Ball
        "🤾‍♂️", // Man Playing Handball
        "🤾‍♀️", // Woman Playing Handball
        "🏄‍♂️", // Man Surfing
        "🏄‍♀️", // Woman Surfing
        "🚴‍♂️", // Man Biking
        "🚴‍♀️", // Woman Biking
        "🏇", // Horse Racing
        "🏊‍♂️", // Man Swimming
        "🏊‍♀️", // Woman Swimming
        "🧗‍♂️", // Man Climbing
        "🧗‍♀️", // Woman Climbing
        "🏆", // Trophy
        "🥇", // 1st Place Medal
        "🥈", // 2nd Place Medal
        "🥉", // 3rd Place Medal
        "🎖️", // Military Medal
        "🏅", // Sports Medal
        "🎾", // Tennis
        "🏀", // Basketball
        "⚽", // Soccer Ball
        "🏈", // American Football
        "⚾", // Baseball
        "🥎", // Softball
        "🏐", // Volleyball
        "🏉", // Rugby Football
        "🎱", // Pool 8 Ball
        "🥊", // Boxing Glove
        "🏏", // Cricket Game
        "🏓", // Ping Pong
        "🏸", // Badminton
    ];

    const randomIndex = Math.floor(Math.random() * emojis.length);

    return emojis[randomIndex];
}

// export default getRandomEmoji();