import styled from "styled-components";
import { EmphasisedText } from "./LandingPageHome";
import { AiFillGithub } from "react-icons/ai";

const StyledTitle = styled.div`
  font-family: "Poppins", sans-serif;
  font-size: 2rem;
  margin-bottom: 0.5rem;
`;

const StyledTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 70%;
`;

export const LandingPageOverview: React.FC = () => {
  return (
    <StyledTextContainer>
      <StyledTitle>
        {" "}
        A brief introduction on <EmphasisedText>why</EmphasisedText>{" "}
      </StyledTitle>
      <p>
        &emsp; At first, this project was ought to be a playground for me to
        sharpen my Django (and DjangoRestFramework) skills, as I had an
        intention of once becoming a fullstack developer with Django on backend
        and React on frontend. I still have this desire, however, during both
        the development process of this app, as well as during some of the
        recruitment processes that I was participating in at the time I saw that
        using Python at the backend comes with a cost. And if you are not
        well-experienced programmer with a deep knowgledge of every possible
        backend field, just like me, this cost can be huge. The main concerns
        that I found were connected with strong typing, programmer-language
        relations, Runtime errors and the pace at which your code starts to
        become obsolete and dependent on maintaining.
      </p>
      <p>
        &emsp; Now, I have this advantage over others that I live in one flat
        with a best friend of mine who is a really good programmer - a person
        acquainted with a lots of fields in Computer Science and life in
        general, an authority one could say. I shared my concerns with him and
        he said that, well, if I already know TypeScript (and JavaScript),
        coming from frontend, then why wouldn't I try the Node.JS and some web
        frameworks. I decided to give it a shot and found that this whole
        ecosystem is something that I really enjoy being put into. Therefore I
        decided to scrap the Django backend (it actually still exists in this
        <a href="https://github.com/JakubSapko/hucuPlant"> project's repo</a> as
        an archive of the progress) and start up with a new stack. I decided on
        Node.JS, ExpressJS, React (all using TypeScript) and PostgreSQL as a
        database. Now, the development with that stack has become a pure
        pleasure for me. It really showed me the way in which I want to go as an
        aspiring fullstack developer. Everything about those tools, be it either
        language or frameworks made me want dig deeper into them, rather than
        going broader. And as I think that broadening one's knowledge is a good
        thing, I also think that going deep into something is what makes a
        developer "good". Now I also have this purpose.
      </p>
      <p>
        &emsp; The last, but no least, reason is that we have quite a lot of
        plants in our flat ("hucu" flat :)) and some of them occasionally get
        forgotten about. I strongly believe that tools made by humans should be
        as useful as possible, so when learning something new I like to have
        this feeling of purpose. This really makes a whole process easier -
        knowing that you'll both learn some new things and provide a solution to
        a problem.
      </p>
      <p>
        &emsp; So yeah, enjoy and hopefully it will be useful for you as well!
      </p>
    </StyledTextContainer>
  );
};
