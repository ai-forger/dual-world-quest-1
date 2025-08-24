# Parallel Dimensions - Retro Game

A **split-screen platformer** where you control **two characters simultaneously** across parallel worlds!

## 🎮 Game Concept

**Parallel Dimensions** is a unique platformer where you must navigate both characters through two different worlds at the same time:
- **Top Screen:** Normal world (green character)
- **Bottom Screen:** Glitched world (magenta character)
- **Challenge:** Both characters must reach the exit simultaneously to complete each level

## 🎯 How to Play

### Objective
Guide both characters to the yellow exit portal at the same time while avoiding red obstacles and deadly pits.

### Controls
- **PC:** Arrow keys (Left/Right to move, Up to jump)
- **Mobile:** Swipe left/right to move, swipe up to jump

### Game Mechanics
- **Dual Control:** Both characters move simultaneously with the same input
- **Split Worlds:** Each world has different platform layouts and obstacles
- **Lives System:** You have 3 lives to complete all levels
- **Progressive Difficulty:** 3 levels with increasing challenge

## 🚀 Getting Started

1. **Download** all files to a folder
2. **Open** `index.html` in a modern web browser
3. **Click** "START GAME" to begin
4. **Use** arrow keys or touch controls to play

## 📁 Project Structure

```
parallel-dimensions/
├── index.html          # Main HTML file
├── style.css           # Retro pixel-art styling
├── game.js             # Complete game logic
└── README.md           # This file
```

## 🎨 Customization

### Adding New Levels
Edit the `levels` array in `game.js` to create new challenges:

```javascript
{
    platforms: [
        // Top world platforms
        {x: 0, y: 280, width: 800, height: 20, color: '#444'},
        // Bottom world platforms  
        {x: 0, y: 580, width: 800, height: 20, color: '#800080'},
    ],
    obstacles: [
        {x: 300, y: 260, width: 20, height: 40, color: '#ff0000'},
    ],
    exit: {
        x: 750, y: 260, width: 30, height: 40, color: '#ffff00'
    }
}
```

### Visual Customization
- **Colors:** Modify hex values in the game objects
- **Fonts:** Change the Google Fonts import in `style.css`
- **Canvas Size:** Adjust dimensions in `game.js` constructor

### Adding Features
The code is modular and well-commented. Look for these TODO areas:
- Sound effects and music
- Power-ups and collectibles
- More complex level mechanics
- Particle effects and animations

## 🛠️ Technical Details

- **Pure HTML5 Canvas** - No external libraries
- **Responsive Design** - Works on both PC and mobile
- **60 FPS Game Loop** - Smooth gameplay
- **Collision Detection** - Precise hitbox system
- **Touch Controls** - Mobile-optimized swipe detection

## 🎵 Future Enhancements

- [ ] Sound effects (jump, game over, victory)
- [ ] Background music
- [ ] Particle effects for deaths and victories
- [ ] More levels and world themes
- [ ] Character animations and sprites
- [ ] Power-ups and special abilities
- [ ] Level editor
- [ ] High score system

## 🌟 Features

✅ **Complete Game Loop** - Start, play, win/lose, restart  
✅ **3 Progressive Levels** - Tutorial to expert difficulty  
✅ **Dual World Mechanics** - Unique split-screen gameplay  
✅ **Cross-Platform Controls** - Keyboard + touch support  
✅ **Retro Visual Style** - 8-bit pixel art aesthetic  
✅ **Responsive Design** - Mobile and desktop optimized  
✅ **Modular Code** - Easy to extend and customize  

## 🎮 Game States

1. **Start Screen** - Title and instructions
2. **Playing** - Active gameplay
3. **Victory** - Level completed
4. **Game Over** - All lives lost

## 🔧 Browser Compatibility

- Chrome/Edge (recommended)
- Firefox
- Safari
- Mobile browsers (iOS/Android)

## 📝 License

This project is open source. Feel free to modify, distribute, and use for your own projects!

---

**Enjoy playing Parallel Dimensions!** 🎮✨

*"Master both worlds to unlock the secrets of the parallel dimensions..."*
