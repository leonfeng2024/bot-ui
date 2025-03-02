from PIL import Image, ImageDraw
import os

def create_avatar(filename, color, size=200):
    """Create a simple avatar with the given color."""
    img = Image.new('RGB', (size, size), color=color)
    draw = ImageDraw.Draw(img)
    
    # Draw a simple face
    # Circle for the head
    draw.ellipse((50, 50, size-50, size-50), fill=(255, 255, 255))
    
    # Eyes
    eye_size = size // 10
    draw.ellipse((size//3 - eye_size//2, size//3 - eye_size//2, 
                  size//3 + eye_size//2, size//3 + eye_size//2), fill=(0, 0, 0))
    draw.ellipse((2*size//3 - eye_size//2, size//3 - eye_size//2, 
                  2*size//3 + eye_size//2, size//3 + eye_size//2), fill=(0, 0, 0))
    
    # Smile
    draw.arc((size//3, size//2, 2*size//3, 3*size//4), 0, 180, fill=(0, 0, 0), width=5)
    
    # Save the image
    img.save(filename)
    print(f"Created avatar: {filename}")

def main():
    # Get the current script directory
    script_dir = os.path.dirname(os.path.abspath(__file__))
    
    # Create user avatar (blue)
    user_avatar_path = os.path.join(script_dir, "user_avatar.png")
    create_avatar(user_avatar_path, (73, 109, 137))
    
    # Create bot avatar (green)
    bot_avatar_path = os.path.join(script_dir, "bot_avatar.png")
    create_avatar(bot_avatar_path, (34, 139, 34))

if __name__ == "__main__":
    main() 