import {Friend, Colleague, ColleagueHistory, EmailContact } from './myTypes'
import { friends, colleagues } from "./01-basics";

function older(f: Friend) : string {
    f.age += 1
    return `${f.name} is now ${f.age}` 
}

console.log(older(friends[0]))

function allOlder(f: Friend[]) : string[] {
    return f.map(f => `${f.name} is now ${f.age += 1}`)
}

console.log(allOlder(friends))

// Find the colleague with the highest extension number.
function highestExtension(cs: Colleague[]): Colleague {
  const result = cs.sort(
    (c1, c2) => c1.contact.extension - c2.contact.extension
  );
  return result[cs.length - 1];
}
console.log(highestExtension(colleagues.current));

function addColleague(current: ColleagueHistory["current"], name: Colleague["name"], department: Colleague["department"], email: Colleague["contact"]["email"]) {
    current.push({
        name,
        department,
        contact: {
            email,
            extension: current.reduce((prev, { contact: { extension }}) => extension > prev ? extension : prev, -1) + 1
        }
    })
}

addColleague(colleagues.current, "Sheild O Connell", "HR", "soc@here.com");
console.log(colleagues.current.filter((c) => c.name === "Sheild O Connell"));

function sortColleagues(
  colleagues: Colleague[],
  sorter: (c1: Colleague, c2: Colleague) => number,
  max? : number
): EmailContact[] {
  let end = colleagues.length;
  if (max !== undefined) {
     end = max < 2 ? 1 : max
  }
  const sorted = colleagues.sort(sorter);
  const fullResult =  sorted.map((ce) => ({ name: ce.name, email: ce.contact.email }));
  return fullResult.slice(0,end)
}
// Test invocations
console.log(sortColleagues(colleagues.current, (a, b) => (a.contact.extension - b.contact.extension),3));
console.log(sortColleagues(colleagues.current, (a, b) => (a.name.length - b.name.length),1));
console.log(sortColleagues(colleagues.current, (a, b) => (a.name.length - b.name.length))); // NEW

function findFriends(friends: Friend[], filter: (f: Friend) => boolean): Friend["name"][] {
    return friends.filter(f => filter(f)).map(f => f.name);
}

console.log(findFriends(friends, (friend) => friend.name.startsWith('Pa')));
console.log(findFriends(friends, (friend) => friend.age < 35));

function addInterest(friend: Friend, interest: NonNullable<Friend["interests"]>[0]) {
    if (typeof friend.interests?.push(interest) == "undefined") {
        friend.interests = [interest];
    }

    return friend.interests;
}

console.log(addInterest(friends[0], 'Politics'))
console.log(addInterest(friends[1], 'Politics'))
