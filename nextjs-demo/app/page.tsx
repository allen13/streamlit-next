'use client';

import { useState } from 'react';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function BasicWidgets() {
  const [name, setName] = useState('');
  const [age, setAge] = useState(25);
  const [score, setScore] = useState(5);
  const [birthday, setBirthday] = useState('1990-01-01');
  const [favoriteColor, setFavoriteColor] = useState('Blue');
  const [hobbies, setHobbies] = useState<string[]>([]);
  const [petPreference, setPetPreference] = useState('Both');
  const [subscribe, setSubscribe] = useState(false);

  const hobbyOptions = ['Reading', 'Gaming', 'Sports', 'Music', 'Cooking', 'Travel'];

  return (
    <div className="max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-8">Basic Widgets</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <h3 className="text-xl font-semibold mb-4">Input Widgets</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">Enter your name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Your name"
            />
            {name && <p className="mt-2 text-gray-800 font-medium">Hello, {name}!</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Enter your age: {age}
            </label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(Number(e.target.value))}
              min={0}
              max={150}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="mt-2 text-gray-800">You are {age} years old</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Rate this demo (1-10): {score}
            </label>
            <Slider
              value={[score]}
              onValueChange={([value]) => setScore(value)}
              max={10}
              min={1}
              step={1}
            />
            <p className="mt-2 text-gray-800">Your rating: {score}/10</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">Your birthday:</label>
            <input
              type="date"
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="mt-2 text-gray-800">Birthday: {birthday}</p>
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-xl font-semibold mb-4">Selection Widgets</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">What's your favorite color?</label>
            <Select value={favoriteColor} onValueChange={setFavoriteColor}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {['Red', 'Green', 'Blue', 'Yellow', 'Purple'].map(color => (
                  <SelectItem key={color} value={color}>{color}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="mt-2 text-gray-800">Favorite color: {favoriteColor}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">Select your hobbies:</label>
            <div className="space-y-2">
              {hobbyOptions.map(hobby => (
                <label key={hobby} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={hobbies.includes(hobby)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setHobbies([...hobbies, hobby]);
                      } else {
                        setHobbies(hobbies.filter(h => h !== hobby));
                      }
                    }}
                    className="mr-2"
                  />
                  {hobby}
                </label>
              ))}
            </div>
            {hobbies.length > 0 && (
              <p className="mt-2 text-gray-800">Your hobbies: {hobbies.join(', ')}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">Do you prefer cats or dogs?</label>
            <div className="space-y-2">
              {['Cats', 'Dogs', 'Both', 'Neither'].map(option => (
                <label key={option} className="flex items-center">
                  <input
                    type="radio"
                    name="petPreference"
                    value={option}
                    checked={petPreference === option}
                    onChange={(e) => setPetPreference(e.target.value)}
                    className="mr-2"
                  />
                  {option}
                </label>
              ))}
            </div>
            <p className="mt-2 text-gray-800">Pet preference: {petPreference}</p>
          </div>

          <div>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={subscribe}
                onChange={(e) => setSubscribe(e.target.checked)}
                className="mr-2"
              />
              Subscribe to newsletter
            </label>
            {subscribe && (
              <p className="mt-2 text-green-600">Thanks for subscribing!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}