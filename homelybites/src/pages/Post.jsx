import React, { useState } from 'react';
import { X, Image, Upload } from 'lucide-react';

const Post = ({ isOpen, onClose }) => {
  const [newPost, setNewPost] = useState({
    content: '',
    images: [],
    title: ''
  });
  const [isDragOver, setIsDragOver] = useState(false);

  // Mock current user data
  const currentUser = {
    name: 'ArkoArkoRandyOrtan',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
  };

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    
    const imagePromises = files.map(file => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve({
          file,
          preview: e.target.result,
          name: file.name
        });
        reader.readAsDataURL(file);
      });
    });

    Promise.all(imagePromises).then(images => {
      setNewPost(prev => ({
        ...prev,
        images: [...prev.images, ...images]
      }));
    });
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      const event = { target: { files } };
      handleImageUpload(event);
    }
  };

  const removeImage = (index) => {
    setNewPost(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleCreatePost = () => {
    if (!newPost.content.trim() && newPost.images.length === 0) return;
    
    // TODO: Add API call to create post
    console.log('Creating post:', newPost);
    
    // Reset form and close modal
    setNewPost({ content: '', images: [], title: '' });
    onClose();
  };

  const triggerFileInput = () => {
    document.getElementById('post-file-input').click();
  };

  const closeModal = () => {
    setNewPost({ content: '', images: [], title: '' });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-2xl font-bold text-gray-800 text-center flex-1">Create Post</h2>
          <button 
            onClick={closeModal}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          {/* User Post Input Section */}
          <div className="bg-gray-100 rounded-2xl p-4 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full overflow-hidden">
                <img 
                  src={currentUser.avatar} 
                  alt={currentUser.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="font-bold text-gray-800">{currentUser.name}</span>
            </div>
            
            <div className="flex items-center bg-white rounded-xl p-3 gap-3">
              <input
                type="text"
                placeholder="What is in your mind?"
                value={newPost.content}
                onChange={(e) => setNewPost(prev => ({ ...prev, content: e.target.value }))}
                className="flex-1 outline-none text-gray-600"
              />
              <div className="flex items-center gap-2">
                <button 
                  onClick={triggerFileInput}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <Image className="w-5 h-5 text-gray-400" />
                </button>
                <button
                  onClick={handleCreatePost}
                  disabled={!newPost.content.trim() && newPost.images.length === 0}
                  className="px-4 py-2 bg-red-400 text-white rounded-lg hover:bg-red-500 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed text-sm font-medium"
                >
                  Post
                </button>
              </div>
            </div>
          </div>

          {/* Image Upload Area */}
          <div className="border-2 border-gray-200 rounded-2xl p-8">
            <div 
              onClick={triggerFileInput}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-all duration-200 ${
                isDragOver 
                  ? 'border-red-400 bg-red-50' 
                  : 'border-gray-300 hover:border-red-400 hover:bg-red-50'
              }`}
            >
              <div className="flex items-center justify-center mb-4">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                  <Image className="w-8 h-8 text-red-400" />
                </div>
              </div>
              <p className="text-xl font-bold text-gray-800 mb-2">Add photos/videos</p>
              <p className="text-gray-500">or drag and drop</p>
            </div>
            
            <input
              id="post-file-input"
              type="file"
              multiple
              accept="image/*,video/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>

          {/* Image Preview */}
          {newPost.images.length > 0 && (
            <div className="mt-6">
              <h4 className="font-medium text-gray-700 mb-3">Selected Images:</h4>
              <div className="grid grid-cols-2 gap-4">
                {newPost.images.map((image, index) => (
                  <div key={index} className="relative group">
                    <img 
                      src={image.preview} 
                      alt={`Preview ${index + 1}`}
                      className="w-full h-32 object-cover rounded-xl"
                    />
                    <button
                      onClick={() => removeImage(index)}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
                      {image.name}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-6 border-t border-gray-100 flex justify-center">
          <button
            onClick={handleCreatePost}
            disabled={!newPost.content.trim() && newPost.images.length === 0}
            className="px-12 py-3 bg-red-400 text-white rounded-xl hover:bg-red-500 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed font-bold text-lg"
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default Post;